import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogContent,
  Button
} from '@insertlogic/o8-lib';

interface DeleteAlertProps {
  deleteOpen: boolean;
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
}

const DeleteAlert = ({ deleteOpen, setDeleteOpen, onDelete }: DeleteAlertProps) => {
  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-body">
            This action cannot be undone and the item will be deleted from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" className="bg-primary" onClick={onDelete}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
