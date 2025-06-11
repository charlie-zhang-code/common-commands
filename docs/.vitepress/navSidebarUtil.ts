// https://fang-kang.github.io/note/articles/04-%E5%85%B6%E4%BB%96/VitePress/VitePress%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%AF%BC%E8%88%AA%E5%92%8C%E4%BE%A7%E8%BE%B9%E6%A0%8F.html
import { resolve, join, sep } from 'node:path'
import { readdirSync, statSync } from 'node:fs'
import { DefaultTheme } from 'vitepress'

interface SidebarGenerateConfig {
  /**
   * 需要遍历的根目录. 默认: docs目录
   */
  rootDir?: string
  /**
   * 忽略的文件名. 默认: index.md
   */
  ignoreFileName?: string
  /**
   * 忽略的文件夹名称. 默认: ['demo','asserts','node_modules', '.vitepress']
   */
  ignoreDirNames?: string[]
  /**
   * 最大遍历层级. 默认: 3
   */
  maxLevel?: number
}

interface SideBarItem {
  text: string
  collapsible?: boolean
  collapsed?: boolean
  items?: SideBarItem[]
  link?: string
}

interface NavGenerateConfig {
  /**
   * 需要遍历的根目录. 默认: docs目录
   */
  rootDir?: string
  /**
   * 最大遍历层级. 默认: 2
   */
  maxLevel?: number
  /**
   * 忽略的文件夹名称. 默认: ['demo','asserts','node_modules', '.vitepress']
   */
  ignoreDirNames?: string[]
}

/**
 * 判断是否为markdown文件
 * @param fileName 文件名
 * @returns 有返回值则表示是markdown文件,否则不是
 */
function isMarkdownFile(fileName: string) {
  return !!fileName.match(/.+\.md$/)
}

// 获取docs目录的完整名称(从根目录一直到docs目录)
const docsDirFullPath = join(__dirname, '../')
// 获取docs目录的完整长度
const docsDirFullPathLen = docsDirFullPath.length

/**
 * 获取dirOrFileFullName中第一个/docs/后的所有内容
 *  如:
 * /a-root/docs/test 则 获取到 /test
 * /a-root-docs/docs/test 则 获取到 /test
 * /a-root-docs/docs/docs/test 则 获取到 /docs/test
 * @param dirOrFileFullName 文件或者目录名
 * @returns
 */
function getDocsDirNameAfterStr(dirOrFileFullName: string) {
  // 使用docsDirFullPathLen采用字符串截取的方式，避免多层目录都叫docs的问题
  return `${sep}${dirOrFileFullName.substring(docsDirFullPathLen)}`
}

/**
 * 生成侧边栏数据
 * @param sidebarGenerateConfig 配置项
 * @returns 侧边栏数据对象
 */
export function getSidebarData(sidebarGenerateConfig: SidebarGenerateConfig = {}) {
  const {
    rootDir = docsDirFullPath,
    ignoreFileName = '',
    ignoreDirNames = ['demo', 'asserts', 'node_modules', '.vitepress'],
    maxLevel = 3,
  } = sidebarGenerateConfig

  const sidebarData = {}
  const rootPath = resolve(rootDir)
  
  // 遍历根目录下的所有文件和目录
  readdirSync(rootPath).forEach(item => {
    const itemPath = join(rootPath, item)
    const stats = statSync(itemPath)
    
    if (stats.isDirectory() && !ignoreDirNames.includes(item)) {
      const relativePath = getDocsDirNameAfterStr(itemPath).replace(/\\/g, '/') + '/'
      const items = generateSidebarItems(itemPath, 1, maxLevel, ignoreFileName, ignoreDirNames)
      
      if (items.length > 0) {
        sidebarData[relativePath] = items
      }
    }
  })

  return sidebarData
}

/**
 * 递归生成侧边栏项目
 * @param currentPath 当前路径
 * @param currentLevel 当前层级
 * @param maxLevel 最大层级
 * @param ignoreFileName 忽略的文件名
 * @param ignoreDirNames 忽略的目录名
 * @returns 侧边栏项目数组
 */
function generateSidebarItems(
  currentPath: string,
  currentLevel: number,
  maxLevel: number,
  ignoreFileName: string,
  ignoreDirNames: string[]
): SideBarItem[] {
  const items: SideBarItem[] = []
  const indexItems: SideBarItem[] = []
  const otherItems: SideBarItem[] = []
  
  readdirSync(currentPath).forEach(item => {
    const itemPath = join(currentPath, item)
    const stats = statSync(itemPath)
    
    if (stats.isDirectory()) {
      if (!ignoreDirNames.includes(item)) {
        const text = formatItemText(item)
        const dirItem: SideBarItem = {
          text,
          collapsed: currentLevel > 1,
          collapsible: true
        }
        
        if (currentLevel < maxLevel) {
          dirItem.items = generateSidebarItems(
            itemPath,
            currentLevel + 1,
            maxLevel,
            ignoreFileName,
            ignoreDirNames
          )
        }
        
        // 如果目录下有内容才添加到侧边栏
        if (dirItem.items && dirItem.items.length > 0) {
          otherItems.push(dirItem)
        }
      }
    } else if (isMarkdownFile(item) && item !== ignoreFileName) {
      const text = formatItemText(item.replace(/\.md$/, ''))
      const itemObj = {
        text,
        link: getDocsDirNameAfterStr(itemPath).replace(/\.md$/, '').replace(/\\/g, '/')
      }
      
      // 如果是index.md，放到indexItems数组，否则放到otherItems数组
      if (item === 'index.md') {
        indexItems.unshift(itemObj) // 确保index.md在最前面
      } else {
        otherItems.push(itemObj)
      }
    }
  })
  
  // 合并数组，indexItems在前，otherItems在后
  return [...indexItems, ...otherItems]
}

/**
 * 格式化项目文本（去除序号等）
 * @param text 原始文本
 * @returns 格式化后的文本
 */
function formatItemText(text: string): string {
  // 去除类似 "01-" 的前缀
  text = text.replace(/^\d{2,}-/, '')
  
  // 判断是否是英文（不含中文、日文、韩文等字符）
  const isEnglish = !/[^\x00-\x7F]/.test(text)
  
  if (isEnglish && text.length > 0) {
    // 英文文本首字母大写
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
  
  return text
}

/**
 * 生成导航数据
 * @param navGenerateConfig 配置项
 * @returns 导航数据数组
 */
export function getNavData(navGenerateConfig: NavGenerateConfig = {}) {
  const {
    rootDir = docsDirFullPath,
    maxLevel = 2,
    ignoreDirNames = ['demo', 'asserts', 'node_modules', '.vitepress'],
  } = navGenerateConfig

  return generateNavItems(rootDir, 1, maxLevel, ignoreDirNames)
}

/**
 * 递归生成导航项目
 * @param currentPath 当前路径
 * @param currentLevel 当前层级
 * @param maxLevel 最大层级
 * @param ignoreDirNames 忽略的目录名
 * @returns 导航项目数组
 */
function generateNavItems(
  currentPath: string,
  currentLevel: number,
  maxLevel: number,
  ignoreDirNames: string[]
): DefaultTheme.NavItem[] {
  const items: DefaultTheme.NavItem[] = []
  
  readdirSync(currentPath).forEach(item => {
    const itemPath = join(currentPath, item)
    const stats = statSync(itemPath)
    const relativePath = getDocsDirNameAfterStr(itemPath)
    
    if (stats.isDirectory()) {
      if (!ignoreDirNames.includes(item)) {
        const text = formatItemText(item)
        const children = generateNavItems(itemPath, currentLevel + 1, maxLevel, ignoreDirNames) as DefaultTheme.NavItemChildren[]
        
        // 如果有子项且当前层级小于最大层级，则创建下拉菜单
        if (children.length > 0 && currentLevel < maxLevel) {
          items.push({
            text,
            items: children
          })
        } 
        // 如果没有子项或者已经达到最大层级，则创建普通链接
        else {
          items.push({
            text,
            link: `${relativePath.replace(/\\/g, '/')}/`,
            activeMatch: `${relativePath.replace(/\\/g, '/')}/`
          })
        }
      }
    } else if (isMarkdownFile(item) && item !== 'index.md') {
      // 只在第一层级添加文件链接
      if (currentLevel === 1) {
        items.push({
          text: formatItemText(item.replace(/\.md$/, '')),
          link: relativePath.replace(/\.md$/, '').replace(/\\/g, '/'),
          activeMatch: `${relativePath.replace(/\\/g, '/')}/`
        })
      }
    }
  })
  
  return items
}