import * as React from 'react';
import EventEmitter, { Emitter } from 'event-emitter';

import { Snackbar } from './snackbar';

const emitter: Emitter = EventEmitter();

interface SnackbarOptions {
  autoHideDuration?: number;
  message: string | React.ReactNode;
  type?: 'default' | 'success' | 'information' | 'danger';
}

export class WebSnackbar {
  static showSnackbar(options: SnackbarOptions) {
    emitter.emit('show', options);
  }
  static showSuccessSnackbar(message: string, autoHideDuration?: number) {
    emitter.emit('show', { type: 'success', message, autoHideDuration });
  }
  static showInformationSnackbar(message: string, autoHideDuration?: number) {
    emitter.emit('show', { type: 'information', message, autoHideDuration });
  }
  static showDangerSnackbar(message: string, autoHideDuration?: number) {
    emitter.emit('show', { type: 'danger', message, autoHideDuration });
  }
}

export const GlobalSnackbar: React.FC = ({}) => {
  const [options, setOptions] = React.useState<any>(null);

  React.useEffect(() => {
    const onShow = (newOptions: any) => {
      setOptions(newOptions);
    };
    emitter.on('show', onShow);

    return () => {
      emitter.off('show', onShow);
    };
  }, []);

  return (
    <Snackbar
      autoHideDuration={15000}
      {...options}
      open={Boolean(options)}
      onClose={() => {
        setOptions(null);
        if (options.onClose) {
          options.onClose();
        }
      }}
    />
  );
};
