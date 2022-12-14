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
import { ConfirmationService } from 'primeng/api';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('external') external!: ElementRef;
  @ViewChild('calendar', { static: true }) calendar!: FullCalendarComponent;
  constructor(
    private cdref: ChangeDetectorRef,
    public confService: ConfirmationService,
  ) { }

  evDialog: boolean = false;
  evTitle: string = '';
  currentEvents: EventApi[] = [];
  calendarVisible = true;
  eventsPromise!: Promise<EventSourceInput>;
  submitted: boolean = false;
  open: boolean = false;

  ngOnInit(): void {
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
    selectMirror: false,
    dayMaxEvents: true,
    height: '80vh',
    droppable: true,
    locales: [trLocale, enLocale], // make an selection to switch between Tr and English
    locale: trLocale,

    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventDrop: this.handleDrag.bind(this),
    /* you can update a remote database when these fire:
eventAdd:
eventChange:
eventRemove:
*/

  };

  handleDrag(e: any) {
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


  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  }

  async handleDateSelect(selectInfo: DateSelectArg) {

    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    const { value: title } = await Swal.fire({
      input: 'text',
      inputLabel: 'Your event',
      inputPlaceholder: 'Type it here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    let ids =''
    
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }

    console.log(calendarApi.getEvents())
  }

  hideDialog() {
    this.evTitle = '';
    this.evDialog = false;
  }

  save() {
    this.evDialog = false;
  }

  handleEventClick(clickInfo: EventClickArg) {
    /*     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove();
        } */

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete the '${clickInfo.event.title}'`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: '20rem',
    }).then((result) => {
      if (result.isConfirmed) {
        clickInfo.event.remove();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.cdref.detectChanges();
  }

  eventClick(model: any) {
    console.log(model);
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}
