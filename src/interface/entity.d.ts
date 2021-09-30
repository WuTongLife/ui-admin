declare namespace Entity {
  interface User {
    nickname?: string;
    username?: string;
  }

  interface Article {
    article_id: number;
    article_title: string;
    article_content: string;
    article_status: number;
    article_views: number;
    article_comment_count: number;
    article_data: string;
    article_like_count: number;
    article_cover_img?: string;
    label_id: number;
  }
}
