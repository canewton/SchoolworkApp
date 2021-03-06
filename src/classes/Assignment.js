export class Assignment {
  constructor(id, schoolClass, title, iconName, date, completed, attachedNotesIDs) {
    this.id = id;
    this.schoolClass = schoolClass;
    this.date = date;
    this.title = title;
    this.iconName = iconName;
    this.completed = completed;
    this.attachedNotesIDs = attachedNotesIDs;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
