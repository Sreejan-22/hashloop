import { notifyError } from "./notifyToasts";

export const handleServerError = (message) => {
  alert(message);
};

export const handleSignupError = (errors) => {
  if (errors.email.length) {
    notifyError(errors.email);
    // alert(errors.email);
  }

  if (errors.name.length) {
    notifyError(errors.name);
  }

  if (errors.username.length) {
    notifyError(errors.username);
  }

  if (errors.password.length) {
    notifyError(errors.password);
  }
};
