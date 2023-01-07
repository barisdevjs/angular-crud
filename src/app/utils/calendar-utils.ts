import { EventInput } from "@fullcalendar/core";
import { add, format } from "date-fns";

let eventGuid = 0;
const date = new Date();
const TODAY_STR =  format(date,  'yyyy-MM-dd')
const TOMORROW_STR = format(add(date, { days: 1}), 'yyyy-MM-dd' )
const WEEKAHEAD_STR = format(add(date, { days: 6}), 'yyyy-MM-dd' )

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR,
/*     borderColor: 'red',
    backgroundColor: 'blue', */
    editable:true
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TOMORROW_STR + 'T10:00:00',
    end: TOMORROW_STR + 'T13:00:00',
    editable:true
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: WEEKAHEAD_STR + 'T12:00:00',
    end: WEEKAHEAD_STR + 'T15:00:00',
    editable:true
  }
];

export function createEventId() {
  return String(eventGuid++);
}