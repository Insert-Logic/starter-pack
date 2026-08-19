import type { RuntimeByStateResponse, RuntimeByWaitStateResponse } from 'types/api-response';
import { runtimeService } from './runtime';
import type { GetRuntimeContext } from 'api/get-runtime-context/-context';
import type { GetChildrenByIdContext } from 'api/get-children-by-id/-context';
import type { GetContextByIds } from 'api/get-context-by-ids/-context';

export const taskService = {
  // Retrieve one task with context by id
  getById: async function (id: string) {
    const tasks = (await runtimeService.getRuntimeByState('task')) as RuntimeByStateResponse[];
    const currentTask = tasks.find(t => t._id.$oid === id);
    const workQueue = currentTask?.targetAssignment?.workQueue;

    const newBody: GetRuntimeContext = {
      runtimeId: id,
      workQueue: workQueue,
    };

    const contextResponse = await runtimeService.create({
      name: 'get-runtime-context',
      body: newBody,
    });

    const newTask = {
      ...currentTask,
      context: contextResponse.context.context,
    };
    return newTask;
  },
  getWaitById: async function (id: string, childLogic: string) {
    // GET current task context
    const parentTasks = (await runtimeService.getRuntimeByState('wait')) as RuntimeByWaitStateResponse[];
    const currentTask = parentTasks.find(t => t._id.$oid === id);
    const newBody: GetRuntimeContext = {
      runtimeId: id,
      workQueue: '',
    };
    const contextResponse = await runtimeService.create({
      name: 'get-runtime-context',
      body: newBody,
    });

    const taskWithContext = {
      ...currentTask,
      context: contextResponse.context.context,
    };

    // Get children status
    const childrenResponse = await runtimeService.create({
      name: 'get-children-by-id',
      body: { id: id },
    });
    const childrenResponseContext = childrenResponse?.context as GetChildrenByIdContext;

    const childrenOngoing =
      childrenResponseContext?.children?.filter(
        c => c.variant === 'parent' && c.logicId === childLogic && c.stageType !== 'end',
      ) ?? [];
    const childsOngoingIds = childrenOngoing.map(c => c.runtimeId);

    const childrenCompleted =
      childrenResponseContext?.children?.filter(
        c => c.variant === 'parent' && c.logicId === childLogic && c.stageType === 'end',
      ) ?? [];

    // Find children tasks
    const tasks = (await runtimeService.getRuntimeByState('task')) as RuntimeByStateResponse[]; // Find children tasks
    const children = tasks.filter(t => childsOngoingIds.includes(t._id.$oid));

    // Get completed children context
    let completedChildren: RuntimeByStateResponse[] = [];
    let completedSteps: string[] = [];
    if (childrenCompleted?.length > 0) {
      const completedChildIds = childrenCompleted.map(c => c.runtimeId);
      const completedTasks = (await runtimeService.getRuntimeByState('end')) as RuntimeByStateResponse[];
      completedChildren = completedTasks.filter(t => completedChildIds.includes(t._id.$oid)) ?? [];

      const completedChildrenResponse = await runtimeService.create({
        name: 'get-context-by-ids',
        body: { ids: completedChildIds },
      });
      const completedChildrenResponseContext = completedChildrenResponse?.context as GetContextByIds;

      completedChildren = completedChildren.map(child => {
        const childContextItem = completedChildrenResponseContext?.items?.find(
          c => c._id.$oid.toString() === child._id.$oid,
        );
        const newChild: RuntimeByStateResponse = {
          ...child,
          context: childContextItem?.context,
          status: 'completed',
        };
        return newChild;
      });

      // How you compare in sidebar to find completed steps
      completedSteps = completedChildren.map(c => `approval-${c?.trigger?.parent}`);
      //   completedSteps = completedChildren.map(c => `approval-${(c?.context)?.role}`);
    }

    return {
      current: taskWithContext,
      children: children,
      completedChildren: completedChildren,
      completedSteps: completedSteps,
    };
  },
};
