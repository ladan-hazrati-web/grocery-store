import ContactItem from "./ContactItem";
import cursorLogo from "../../assets/images/footer/wd-cursor-dark.svg";
import envelopeLogo from "../../assets/images/footer/wd-envelope-dark.svg";
import logo from "../../assets/images/footer/wood-logo-dark.svg";
import phoneLogo from "../../assets/images/footer/wd-phone-dark.svg";

const ContactInfo = () => (
  <div className="mt-8 md:mt-0">
    <img src={logo} alt="Logo" className="invert w-[200px]" />
    <p className="text-[13px] text-gray-200 py-4">
      Condimentum adipiscing vel neque dis nam parturient orci at scelerisque
      neque dis nam parturient.
    </p>
    <ContactItem icon={cursorLogo} text="Azadi Street, IRAN, Tehran" />
    <ContactItem icon={phoneLogo} text="Phone: 09360548278" />
    <ContactItem icon={envelopeLogo} text="Fax: 09360548278" />
  </div>
);

export default ContactInfo;
