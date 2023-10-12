import { AES, enc } from "crypto-js";
import { clientENV } from "../base/env";

type EncryptionArgs = {
  action: "encrypt" | "decrypt";
  data: string;
};

export const encryptionHandler = (args: EncryptionArgs) => {
  const { action, data } = args;

  if (action === "encrypt") {
    const encData = AES.encrypt(data, clientENV.AUTH_KEY).toString();

    return encData;
  }
  const decryptedData = AES.decrypt(data, clientENV.AUTH_KEY).toString(
    enc.Utf8
  );

  return decryptedData;
};
