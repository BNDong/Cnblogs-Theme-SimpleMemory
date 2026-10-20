import config from '../components/config/config';
import status from '../components/status/status';
import tools from '../utils/tools';

export default function createContext() {
    // 初始化
    let _ = {};
    _.__config  = config(); // 配置信息
    _.__status  = status(); // 页面状态信息
    _.__tools   = tools(); // 公共处理工具
    _.__timeIds = {}; // 定时器
    _.__event   = {}; // 事件

    if (_.__config.info.name === '') _.__config.info.name = _.__status.user;

    return _;
}
