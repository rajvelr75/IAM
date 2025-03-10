import { auth } from "./auth";

export type Session = typeof auth.$Infer.Session & {
  user: {
    provider?: string; 
  };
};