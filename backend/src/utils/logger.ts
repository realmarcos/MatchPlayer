import { format, parseISO } from "date-fns";
import pino from "pino";

const logger = pino({
  prettyPrint: {
    ignore: "pid,hostname",
  },
  timestamp: () => `,"time":"${format(parseISO(new Date(Date.now()).toISOString()), "dd/MM/yyyy - HH:mm:ss")}"`,
});

export default logger;
