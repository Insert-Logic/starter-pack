import type { ProcessStage } from "@insertlogic/o8-lib";

// Your stages and steps that will be shown in the sidebar
export const stages: ProcessStage[] = [
  {
    id: 'create',
    title: 'New',
    description: '',
    steps: [],
  },
  {
    id: 'approval',
    title: 'Approval',
    description: '',
    steps: [
      { id: 'approval-step', title: 'approval-step' },
    ],
  },
  {
    id: 'completion',
    title: 'Completed',
    description: '',
    steps: [{ id: 'completion', title: 'completion' }],
  },
];