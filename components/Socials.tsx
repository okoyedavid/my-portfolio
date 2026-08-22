import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { siteConfig } from "@/lib/site-data";

type Props = {
  containerStyles: string;
  iconStyles: string;
};

const socials = [
  { icon: <FiGithub aria-hidden="true" />, path: siteConfig.github, label: "GitHub" },
  { icon: <FiLinkedin aria-hidden="true" />, path: siteConfig.linkedin, label: "LinkedIn" },
  { icon: <FiMail aria-hidden="true" />, path: siteConfig.emailHref, label: "Email" },
];

const Socials = ({ containerStyles, iconStyles }: Props) => {
  return (
    <div className={containerStyles}>
      {socials.map((social) => (
        <Link
          href={social.path}
          key={social.path}
          className={iconStyles}
          aria-label={social.label}
          target={social.path.startsWith("http") ? "_blank" : undefined}
          rel={social.path.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
