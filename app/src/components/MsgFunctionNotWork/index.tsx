import { showMessage } from "react-native-flash-message";

function MsgFunctionNotWork() {
  showMessage({
    message: "Indisponível",
    type: "info",
    statusBarHeight: 35,
    description: "Está funcionalidade não se encontra pronta.",
  });
}

export default MsgFunctionNotWork;
