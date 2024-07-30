import { OptionalDetails } from "../types/apps/personal-log/Details";
import { PersonalLog } from "../types/apps/personal-log/PersonalLog";
import postRequest from "./request/any/postRequest";

export const createLog = (log: PersonalLog<OptionalDetails>) => postRequest("/api/personal-log", log);
