import { useToast } from 'vue-toastification';
const toastComposable = useToast();

export class Toast {
  constructor(public message: string) {}

  static success(message: string) {
    return toastComposable.success(message);
  }

  static error(message: string) {
    return toastComposable.error(message);
  }

  static info(message: string) {
    return toastComposable.info(message);
  }
}
