const ContactItem = ({ icon, text }) => (
  <p className="flex gap-2">
    <img src={icon} alt="" className="invert" />
    <span className="text-[13px] text-gray-200 py-2">{text}</span>
  </p>
);

export default ContactItem;
