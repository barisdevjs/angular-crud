import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { INITIAL_EVENTS, createEventId } from 'src/app/utils/calendar-utils';
import trLocale from '@fullcalendar/core/locales/tr'
import enLocale from '@fullcalendar/core/locales/en-gb';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventSourceInput } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('external') external!: ElementRef; // edit here
  @ViewChild('calendar', { static: true }) calendar!: FullCalendarComponent;
  constructor(private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.calendarOptions);
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
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
    droppable: true,
    locales: [trLocale, enLocale], // make an selection to switch between Tr and English
    locale: trLocale,
    dragScroll:true,
    
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventDragStart: this.handleDrag.bind(this),
    /* you can update a remote database when these fire:
eventAdd:
eventChange:
eventRemove:
*/
  };

  handleDrag(e:any) {
    console.log(e)
    new Draggable(this.external.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    });
  }

  currentEvents: EventApi[] = [];
  calendarVisible = true;
  eventsPromise!: Promise<EventSourceInput>;
  // weekendsVisible = this.calendarOptions.weekends

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
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

  eventClick(model: any) {
    console.log(model);
  }

  dayRender(ev: any) {
    ev.el.addEventListener('dblclick', () => {
      alert('double click!');
    });
  }

  // EVENT IS AN ARRAY OF events

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  eventDragStop(model: Event) {
    console.log(model);
  }
}
