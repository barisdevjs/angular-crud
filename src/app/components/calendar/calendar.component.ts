import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { INITIAL_EVENTS, createEventId } from 'src/app/utils/calendar-utils';
import timeGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/daygrid';
import trLocale from '@fullcalendar/core/locales/tr'
import enLocale from '@fullcalendar/core/locales/en-gb';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions,DateSelectArg, EventClickArg, EventApi,EventSourceInput } from '@fullcalendar/core';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('external') external!: ElementRef; // edit here
  @ViewChild('calendar') calendar!: FullCalendarComponent;
  constructor(private cdref: ChangeDetectorRef) { } 

  ngOnInit(): void {
    console.log(this.calendarOptions);
  } 

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin,timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    }, 
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    height: '80vh',
    droppable : true,
    locales : [ trLocale, enLocale ], // make an selection to switch between Tr and English
    locale: trLocale,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
        /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };


  


  currentEvents: EventApi[] = [];
  calendarVisible = true;
  eventsPromise!: Promise<EventSourceInput>;
  // weekendsVisible = this.calendarOptions.weekends

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleDrag() {
    
  }

  handleWeekendsToggle() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo)
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo)
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.cdref.detectChanges();
  }

  eventClick(model:any) {
    console.log(model);
  }

  // EVENT IS AN ARRAY OF events

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  eventDragStop(model:Event) {
    console.log(model);
  }
}
