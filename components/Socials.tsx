import Link from "next/link";
import { FiExternalLink, FiGithub, FiMail } from "react-icons/fi";
import { siteConfig } from "@/lib/site-data";

type Props = {
  containerStyles: string;
  iconStyles: string;
};

const socials = [
  { icon: <FiGithub />, path: siteConfig.github, label: "GitHub" },
  { icon: <FiExternalLink />, path: siteConfig.website, label: "Website" },
  { icon: <FiMail />, path: `mailto:${siteConfig.email}`, label: "Email" },
];

const Socials = ({ containerStyles, iconStyles }: Props) => {
  return (
    <div className={containerStyles}>
      {socials.map((social, index) => (
        <Link
          href={social.path}
          key={index}
          className={iconStyles}
          aria-label={social.label}
          target="_blank"
          rel="noreferrer"
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
