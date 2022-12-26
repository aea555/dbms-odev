import Links from "./Links";

function LinkList() {
  return (
    <div className="linklist row justify-content-start align-items-center">
      <Links
        class="fa-solid fa-calendar-check fa-2x link-icon"
        name="Appointments"
        url="/user/appointments"
      />
      <Links
        class="fa-solid fa-prescription fa-2x link-icon"
        name="Prescriptions"
        url="/user/prescriptions"
      />
    </div>
  );
}

export default LinkList;
