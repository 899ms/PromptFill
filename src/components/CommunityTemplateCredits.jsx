import { ArrowUpRight } from 'lucide-react';
import { COMMUNITY_TEMPLATE_CREDITS } from '../data/communityCredits';
import { openExternalLink } from '../utils/platform';

const openCreditLink = (event) => {
  event.preventDefault();
  openExternalLink(event.currentTarget.href);
};

export const CommunityTemplateCredits = ({ language, isDarkMode }) => {
  const cn = language === 'cn';
  return (
    <section className="community-credits text-left" data-theme={isDarkMode ? 'dark' : 'light'}>
      <p className="leading-relaxed">
        {cn
          ? '感谢 freestylefly / 苍何与 YouMind 整理案例，也感谢每一位创作者分享作品与灵感。Prompt Fill 将这些创意改编为双语填空模板。'
          : 'Thanks to freestylefly / Canghe, YouMind and every creator for sharing their work and ideas. Prompt Fill adapted these ideas into bilingual fill-in templates.'}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a className="community-credits-source" href="https://github.com/freestylefly/awesome-gpt-image-2" onClick={openCreditLink}>
          awesome-gpt-image-2 <ArrowUpRight size={13} aria-hidden="true" />
        </a>
        <a className="community-credits-source" href="https://youmind.com/zh-CN/gpt-image-2-5-prompts" onClick={openCreditLink}>
          YouMind <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>

      <div className="community-credits-panel mt-4 overflow-hidden rounded-2xl border">
        <div className="community-credits-header flex items-center justify-between gap-3 px-4 py-3">
          <h4 className="community-credits-title text-xs font-semibold">{cn ? '案例与创作者' : 'Cases & creators'}</h4>
          <span className="text-[11px] tabular-nums">
            {COMMUNITY_TEMPLATE_CREDITS.length} {cn ? '个案例' : 'cases'}
          </span>
        </div>
        <div
          className="community-credits-scroll"
          role="region"
          aria-label={cn ? '案例与创作者列表，可滚动浏览' : 'Scrollable list of cases and creators'}
          tabIndex={0}
        >
          <ul className="m-0 list-none px-3">
            {COMMUNITY_TEMPLATE_CREDITS.map((credit) => (
              <li key={credit.caseUrl} className="community-credits-row py-3">
                <p className="community-credits-title break-words text-[13px] font-medium leading-relaxed">
                  {credit.name[cn ? 'cn' : 'en']}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-relaxed">
                  <span className="break-words [overflow-wrap:anywhere]">{credit.author}</span>
                  {credit.sourcePromptType === 'image-reconstruction' && (
                    <span className="community-credits-badge rounded-md px-1.5 py-0.5 text-[10px]">
                      {cn ? '图像反推改编' : 'Image-based adaptation'}
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {credit.originalUrl && (
                    <a className="community-credits-link" href={credit.originalUrl} onClick={openCreditLink}
                      aria-label={`${credit.name[cn ? 'cn' : 'en']} · ${cn ? '查看原帖' : 'View original post'}`}>
                      {cn ? '原帖' : 'Original'} <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  )}
                  <a className="community-credits-link" href={credit.caseUrl} onClick={openCreditLink}
                    aria-label={`${credit.name[cn ? 'cn' : 'en']} · ${cn ? '查看案例' : 'View case'}`}>
                    {cn ? '查看案例' : 'View case'} <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-2.5 text-[11px] leading-relaxed">
        {cn
          ? '「图像反推改编」来自 YouMind 的图像描述，并非创作者的原始提示词。'
          : '“Image-based adaptation” uses YouMind’s image description, not the creator’s original prompt.'}
      </p>
    </section>
  );
};
