# markdown-to-slack-block

A simple action that attemps to transform an input in markdown format to something compatible with an [Slack Block](https://api.slack.com/block-kit)

This action was created for a very specific purpuse so it supports only a few markdown elements.

## Inputs

## `markdown`

**Required** A string in markdown format.

## Outputs

## `slack-blocks`

A string as an Slack Blocks object.

## Example usage

Something like this:
```
## v 0.1.2
### 🚀 Features
  - Some cool feature [PR-51](https://github.com)
  ### 🐛 Bugs
  - This is for real [PR-49](https://github.com)
  - Fixing the cool feature [PR-50](https://github.com)
  - Fixing the fix of the feature [PR-60](https://github.com)
```

Its transformed into this:
```
{"blocks":[{"type":"section","text":{"type":"mrkdwn","text":"*v 0.1.2*","verbatim":true}},{"type":"divider"},{"type":"section","text":{"type":"mrkdwn","text":"*🚀 Features*","verbatim":true}},{"type":"section","text":{"type":"mrkdwn","text":"- Some cool feature  <https://github.com|PR-51>\n","verbatim":true}},{"type":"section","text":{"type":"mrkdwn","text":"*🐛 Bugs*","verbatim":true}},{"type":"section","text":{"type":"mrkdwn","text":"- This is for real  <https://github.com|PR-49>\n- Fixing the cool feature  <https://github.com|PR-50>\n- Fixing the fix of the feature  <https://github.com|PR-60>\n\n","verbatim":true}}]}
```
And gets rendered [like this](https://app.slack.com/block-kit-builder/T1CTWR9GX#%7B%22blocks%22:%5B%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22*v%200.1.2*%22,%22verbatim%22:true%7D%7D,%7B%22type%22:%22divider%22%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22*%F0%9F%9A%80%20Features*%22,%22verbatim%22:true%7D%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22-%20Some%20cool%20feature%20%20%3Chttps://github.com%7CPR-51%3E%5Cn%22,%22verbatim%22:true%7D%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22*%F0%9F%90%9B%20Bugs*%22,%22verbatim%22:true%7D%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22-%20This%20is%20for%20real%20%20%3Chttps://github.com%7CPR-49%3E%5Cn-%20Fixing%20the%20cool%20feature%20%20%3Chttps://github.com%7CPR-50%3E%5Cn-%20Fixing%20the%20fix%20of%20the%20feature%20%20%3Chttps://github.com%7CPR-60%3E%5Cn%5Cn%22,%22verbatim%22:true%7D%7D%5D%7D)
