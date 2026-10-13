# 腾讯企业邮箱询盘配置

本版已包含 Pages Function `/api/quote`。代码完成不代表线上已经能发信；完成以下配置、部署和真实收件验证后，才能确认可用。

## 1. 腾讯企业邮箱

在邮箱管理后台启用 SMTP 客户端访问，取得专用客户端授权码（按账户实际设置）。不要把邮箱密码或授权码写进代码、压缩包或聊天。

固定 SMTP：`smtp.exmail.qq.com:465`，TLS 加密。收件人固定为 `info@welltroy.com`，发件人为配置的企业邮箱，买家邮箱仅作为 Reply-To。请先确认 info 邮箱可以正常收信。

## 2. Cloudflare 配置

在对应 Pages 项目的 Settings → Variables and Secrets 设置：

| 名称 | 类型 | 值 |
|---|---|---|
| SMTP_USER | Secret | 用于发信的完整腾讯企业邮箱地址 |
| SMTP_PASSWORD | Secret | 对应 SMTP 客户端授权码 |
| TURNSTILE_SITE_KEY | 普通变量 | Turnstile 站点公钥 |
| TURNSTILE_SECRET_KEY | Secret | Turnstile 私钥 |

创建 Turnstile Managed 小组件，加入实际使用的站点域名，例如 welltroy.com、www.welltroy.com。如果需要预览环境提交，也要配置对应预览域名及预览环境变量。Production 和 Preview 配置分开管理。代码会校验挑战的域名及 quote action。

项目保留 `wrangler.toml` 中的 `nodejs_compat` 与 compatibility_date。配置完成后重新部署。

## 3. 部署方式

推荐 Git 集成：仓库根目录为本项目目录，构建命令 `pnpm build`，输出目录 `dist`。`functions` 必须与 package.json 同级并提交到仓库。

或在项目根目录使用 Wrangler：先 `pnpm install`、`pnpm build`，再 `pnpm exec wrangler pages deploy dist --project-name welltroy`（项目名以实际后台为准）。

**不要只在 Dashboard 拖拽 dist 静态文件来部署这一版**：必须包含 Functions 的部署流程。压缩包是完整源码交付包，不是仅静态文件上传包。

本地 `astro dev`、静态预览服务器不执行 Pages Functions，表单会显示备用联系方式，这是预期结果。需要联调 Functions 时使用 Wrangler Pages 本地开发，并把本地密钥保存在未纳入版本管理的 `.dev.vars`。

## 4. 上线验收（尚待配置后完成）

1. 在真实域名打开询盘页，确认验证组件加载，完成验证后按钮可用。
2. 提交一条明确标为测试的询盘，检查 info 邮箱的收件箱与垃圾邮件箱。
3. 确认邮件包含产品、数量、联系方式及编号，以及选择的 Logo／定制文件附件；点击回复应指向测试填写的买家邮箱。
4. 检查手机填写后底部按钮不会清空内容；提交失败时内容仍保留。
5. SMTP 接受仅表示邮件服务器接收，不保证最终进收件箱。腾讯账户可能有客户端访问限制、频率限制或风控，需要按实际报错与账户设置处理。

未配置、验证失败、SMTP 失败时都不会显示成功。请求提交期间按钮禁用以避免连续点击；不对不确定的网络结果自动重试。当前没有持久化询盘数据库和跨请求去重，需避免网络超时后反复提交同一条。

## 官方参考

- [Cloudflare Node TLS 支持](https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/)
- [腾讯企业邮箱客户端配置](https://main.qcloudimg.com/raw/document/product/pdf/613_46019_cn.pdf)
- [Nodemailer SMTP 配置](https://nodemailer.com/smtp)

## 文件附件

询盘可选上传最多 3 个文件，总大小不超过 10 MB。支持 PNG、JPG、WEBP、PDF、AI、PSD、DOCX、XLSX、TXT、CSV；浏览器和服务端都会检查格式、数量与大小。文件作为邮件附件发送，不写入公开网站目录，也不需要新增存储服务密钥。

上线验收时请用一个小型 PNG 和一个 PDF 确认真实邮件附件完整。静态预览可检查选择、移除和限制提示，不能确认 SMTP 投递。
