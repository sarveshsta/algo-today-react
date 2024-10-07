import butterup from "butteruptoasts";

export function showToast(title, message, type) {
  butterup.toast({
    title: title,
    message: message,
    location: "top-right",
    icon: true,
    dismissable: true,
    type: type,
  });
}
