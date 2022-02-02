export interface NotionPostHead {
  id: string;
  title: string;
  tags?: NotionTag[];
  icon?: NotionIcon;
  slug?: string;
  createdAt: string;
  updatedAt?: string;

$B!!(B[prop: string]: any;
}

export interface NotionTag {
  id: number;
  color: string;
  name: string;
$B!!(B[prop: string]: any;
}

export interface NotionIcon {
  type: string;
  emoji: string;
}
