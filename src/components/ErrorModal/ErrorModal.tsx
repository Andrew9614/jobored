import { Alert, Button, Modal } from '@mantine/core';
import styles from './ErrorModal.module.scss';
import { ErrorType } from '../../types/errorType';

type ErrorModalType = {
  onClose: () => void;
  open: boolean;
  error: ErrorType | null;
  submit: () => void;
};

export const ErrorModal = ({
  onClose,
  open,
  error,
  submit,
}: ErrorModalType) => {
  return (
    <Modal
      className={styles.modal}
      title="Ошибка"
      onClose={onClose}
      opened={open}
      centered
    >
      <div className={styles.alertContainer}>
        <Alert className={styles.alert} title={error?.code} color="red">
          {error?.message}
        </Alert>
        <Button
          onClick={() => {
            submit();
            onClose();
          }}
        >
          Попробовать еще раз
        </Button>
      </div>
    </Modal>
  );
};
