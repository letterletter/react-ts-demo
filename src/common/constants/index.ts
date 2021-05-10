export const FLOW_CONTAINER_ID = 'J_FlowContainer';
export const MIND_CONTAINER_ID = 'J_MindContainer';

export const LABEL_DEFAULT_TEXT = '新建节点';

export enum RendererType {
  Canvas = 'canvas',
  Svg = 'svg',
}

export enum ItemType {
  Node = 'node',
  Edge = 'edge',
}

export enum ItemState {
  Active = 'active',
  ActiveAnchorPoints = 'activeAnchorPoints',
  Selected = 'selected',
  HighLight = 'highLight',
  Error = 'error',
}

export enum GraphType {
  Flow = 'flow',
  Mind = 'mind',
}

export enum GraphMode {
  Default = 'default',
  AddNode = 'addNode',
  Readonly = 'readonly',
}

export enum GraphState {
  NodeSelected = 'nodeSelected',
  EdgeSelected = 'edgeSelected',
  MultiSelected = 'multiSelected',
  CanvasSelected = 'canvasSelected',
}

export enum LabelState {
  Hide = 'hide',
  Show = 'show',
}

export enum AnchorPointState {
  Enabled = 'enabled',
  Disabled = 'disabled',
}

export enum EditorEvent {
  /** 调用命令之前触发 */
  onBeforeExecuteCommand = 'onBeforeExecuteCommand',
  /** 调用命令之后触发 */
  onAfterExecuteCommand = 'onAfterExecuteCommand',
  /** 改变画面状态触发 */
  onGraphStateChange = 'onGraphStateChange',
  /** 改变标签状态触发 */
  onLabelStateChange = 'onLabelStateChange',
}

export enum EditorCommand {
  /** 撤销 */
  Undo = 'undo',
  /** 重做 */
  Redo = 'redo',
  /** 添加 */
  Add = 'add',
  /** 更新 */
  Update = 'update',
  /** 删除 */
  Remove = 'remove',
  /** 复制 */
  Copy = 'copy',
  /** 粘贴 */
  Paste = 'paste',
  /** 粘贴到这里 */
  PasteHere = 'pasteHere',
  /** 放大 */
  ZoomIn = 'zoomIn',
  /** 缩小 */
  ZoomOut = 'zoomOut',
  /** 插入主题 */
  Topic = 'topic',
  /** 插入子主题 */
  Subtopic = 'subtopic',
  /** 收起 */
  Fold = 'fold',
  /** 展开 */
  Unfold = 'unfold',
}

