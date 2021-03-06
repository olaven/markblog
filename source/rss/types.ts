import { Tag } from "../deps.ts";
import { Collection } from "../blog/collection.ts";

//TODO: this interface is only used by rss. Should it be generalized for more concepts in this program?
export interface Blog {
  channel: Channel;
  collections: Collection[];
}

export interface Channel {
  title: string;
  link: string;
  description: string;
  language?: string;
  copyright?: string;
  managingEditor?: string;
  webmaster?: string;
  pubDate?: string;
  lastBuildDate?: string;
  category?: string;
  generator?: string;
  docs?: string;
  cloud?: string;
  ttl?: number;
  image?: string;
  rating?: string;
  textInput?: string;
  skipHours?: string;
  skipDays?: string;
}

/**
 * "All elements of an item are optional, however at least one of title or description must be present."
 * - https://cyber.harvard.edu/rss/rss.html#hrelementsOfLtitemgt
 */
export interface Item {
  title?: string;
  link?: string;
  description?: string;
  author?: string //TODO: email formatted
  ;
  category?: string //TODO: should have attributes
  ;
  comments?: string //URL for page for comments
  ;
  enclosure?: string //TODO: may have attributes
  ;
  guid?: string // //TODO: may have attributes
  ;
  pubDate?: string //TODO: proper formatting https://www.ietf.org/rfc/rfc822.txt Sun, 19 May 2002 15:21:36 GMT
  ;
  source?: Tag //TODO: should have attributes, not string //source of rss feed <source url="http://www.tomalak.org/links2.xml">Tomalak's Realm</source>
  ;
}
