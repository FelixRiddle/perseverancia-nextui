import { OptionalDetails } from "../types/apps/personal-log/Details";
import { PersonalLog } from "../types/apps/personal-log/PersonalLog";
import { ServerQuery } from "./apps/personalLog/PersonalLogWindowManager";
import postRequest from "./request/any/postRequest";
import putRequest from "./request/any/putRequest";
import getRequest from "./request/getRequest";

export const createLog = (log: PersonalLog<OptionalDetails>) => postRequest("/api/personal-log", log);
export const getLogs = (serverQuery: ServerQuery) => postRequest("/api/personal-log/page", serverQuery);
export const countLogs = () => getRequest("/api/personal-log/count")
export const updateLog = (log: PersonalLog<OptionalDetails>) => putRequest(`/api/personal-log/${log.id}`, log);
