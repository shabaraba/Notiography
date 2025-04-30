import { ArticleService } from '../interfaces/article/ArticleService';
import { NotionArticleService } from '../implementations/notion/NotionArticleService';
import { PostHeadService } from 'application/modules/post/services/PostHeadService';

/**
 * 記事サービスのファクトリークラス
 * 環境変数や設定に応じて適切な記事サービスの実装を提供する
 */
export class ArticleServiceFactory {
  /**
   * 記事サービスのインスタンスを作成する
   * @returns 記事サービスのインスタンス
   */
  static createArticleService(): ArticleService {
    // 環境変数からソースタイプを取得（未設定の場合はnotionをデフォルトとする）
    const sourceType = process.env.ARTICLE_SOURCE || 'notion';
    
    switch (sourceType) {
      case 'markdown':
        // 将来的に追加予定のMarkdown実装
        throw new Error('Markdown source is not implemented yet');
      case 'notion':
      default:
        return new NotionArticleService();
    }
  }

  static createArticleHeadService(): PostHeadService {
    return new PostHeadService();
  }
}
