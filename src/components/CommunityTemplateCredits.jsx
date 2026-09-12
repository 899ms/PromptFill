import { COMMUNITY_TEMPLATE_CREDITS } from '../data/communityCredits';
import { openExternalLink } from '../utils/platform';

export const CommunityTemplateCredits = ({ language }) => (
  <div className="text-left">
    <p className="mb-2">
      {language === 'cn'
        ? '感谢 freestylefly / 苍何与 YouMind 整理案例，也感谢以下创作者分享作品与灵感。以下模板由 Prompt Fill 改编为双语填空形式；标注「图像反推改编」的条目来自 YouMind 的图像描述，并非创作者的原始提示词。'
        : 'Thanks to freestylefly / Canghe and YouMind for curating these cases, and to the creators below for sharing their work and ideas. Prompt Fill adapted them into bilingual fill-in templates. Entries marked “Image-based adaptation” use YouMind’s image descriptions, not the creators’ original prompts.'}
    </p>
    <a
      href="https://github.com/freestylefly/awesome-gpt-image-2"
      onClick={(event) => { event.preventDefault(); openExternalLink(event.currentTarget.href); }}
      className="text-orange-600 underline underline-offset-2"
    >awesome-gpt-image-2</a>
    <a
      href="https://youmind.com/zh-CN/gpt-image-2-5-prompts"
      onClick={(event) => { event.preventDefault(); openExternalLink(event.currentTarget.href); }}
      className="ml-3 text-orange-600 underline underline-offset-2"
    >YouMind · GPT Image 2.5</a>
    <ul className="mt-2 max-h-36 overflow-y-auto space-y-2 pr-2">
      {COMMUNITY_TEMPLATE_CREDITS.map((credit) => (
        <li key={credit.caseUrl}>
          <span>{credit.name[language === 'cn' ? 'cn' : 'en']} · {credit.author}</span>
          {credit.sourcePromptType === 'image-reconstruction' && (
            <span className="ml-2 text-xs opacity-70">
              {language === 'cn' ? '图像反推改编' : 'Image-based adaptation'}
            </span>
          )}
          <span className="ml-2 inline-flex gap-2">
            {credit.originalUrl && (
              <a href={credit.originalUrl}
                onClick={(event) => { event.preventDefault(); openExternalLink(event.currentTarget.href); }}
                className="text-orange-600 underline underline-offset-2">
                {language === 'cn' ? '原帖' : 'Original'}
              </a>
            )}
            <a href={credit.caseUrl}
              onClick={(event) => { event.preventDefault(); openExternalLink(event.currentTarget.href); }}
              className="text-orange-600 underline underline-offset-2">
              {language === 'cn' ? '案例' : 'Case'}
            </a>
          </span>
        </li>
      ))}
    </ul>
  </div>
);
