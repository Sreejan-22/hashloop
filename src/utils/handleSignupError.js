// import { notifyError } from "./noltifyToasts";

export const handleServerError = (message) => {
  alert(message);
};

export const handleSignupError = (errors) => {
  if (errors.email.length) {
    // notifyError(errors.email);
    alert(errors.email);
  }

  if (errors.name.length) {
    alert(errors.name);
  }

  if (errors.username.length) {
    alert(errors.username);
  }

  if (errors.password.length) {
    alert(errors.password);
  }
};
