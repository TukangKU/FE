import {
  ClientUpdateType,
  clientProfileUpdateSchema,
  clientPostJobSchema,
  ClientPostJobType,
} from "./types";
import { getClientProfile, updateProfile, postJobDetail } from "./api";

export {
  getClientProfile,
  updateProfile,
  clientProfileUpdateSchema,
  clientPostJobSchema,
  postJobDetail,
};
export type { ClientUpdateType, ClientPostJobType };
