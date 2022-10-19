const core = require('@actions/core')

const titleRegex = /^#{1,2} /;
const subtitleRegex = /^#{3,6} /;
const linkRegex =  /\[([^\[]+)\](\(.*\))/gm;
const linkUrlRegex =  /(\(.*\))/gm;
const linkNameRegex =  /\[([^\[]+)\]/gm;

var currentBlock;
const blocks = [];

const lines = (text) => {
  return text.split('\n')
}

const main = () => {
  const changelog = core.getInput('markdown');
  const changelogLines = lines(changelog);
  for (const line of changelogLines) {
    addLineToBlock(line.trim());
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  const blocksResponse = createBlocksMain(blocks);
  var blocksResponseString = JSON.stringify(blocksResponse).split(1,-1);
  core.setOutput("slack-blocks", blocksResponseString);
}

const createBlocksMain = (block) => {
  return {
    blocks : blocks
  }
}

const addLineToBlock = (line) => {
  if (isTitle(line) || isSubtitle(line)) {
    addTitleOrSubtitleBlock(line, isTitle(line));
  } else {
    addContentBlock(line);
  }
}

const addTitleOrSubtitleBlock = (line, isTitle) => {
  if(currentBlock) {
    blocks.push(currentBlock);
  }
  currentBlock = createNewBlock();
  const regex = isTitle ? titleRegex : subtitleRegex;
  const tidyTitle = `*${line.replace(regex,'')}*`;
  currentBlock.text.text = tidyTitle;
  blocks.push(currentBlock);
  if (isTitle) {
    blocks.push(createDivider());  
  }
  
  currentBlock = undefined;
}

const addContentBlock = (line) => {
  if(!currentBlock) {
    currentBlock = createNewBlock();
  }
  if(hasLink(line)) {
    currentBlock.text.text += `${line.replace(linkRegex,'')} ${convertMDLinkToSlackLink(line)}\n`;
  } else {
    currentBlock.text.text += line + '\n';  
  }
}

const hasLink = (line) => {
  const re = new RegExp(linkRegex);
  return re.test(line);
}

const convertMDLinkToSlackLink = (line) => {
  const urlRegex = new RegExp(linkUrlRegex);
  const nameRegex = new RegExp(linkNameRegex);
  const url = line.match(urlRegex)[0].slice(1,-1);
  const name = line.match(nameRegex)[0].slice(1,-1);
  return `<${url}|${name}>`;
}

const isTitle = (line) => {
  var re = new RegExp(titleRegex);
  return re.test(line);
}

const isSubtitle = (line) => {
  var re = new RegExp(subtitleRegex);
  return re.test(line);
}

const createNewBlock = () => {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '',
      verbatim: true
    }
  }
}

const createDivider = () => {
  return {
    type: 'divider'
  }
}

main()

