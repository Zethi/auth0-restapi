import bcrypt from "bcrypt";

export class Encrypt {
  public static async hash(text: string): Promise<string> {
    return await bcrypt.hash(text, 10);
  }
  public static async compare(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
