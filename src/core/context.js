import config from '../components/config/config';
import status from '../components/status/status';
import tools from '../utils/tools';

export default function createContext() {
    let _ = {};
    _.__config  = config();
    _.__status  = status();
    _.__tools   = tools();
    _.__timeIds = {};
    _.__event   = {};

    if (_.__config.info.name === '') _.__config.info.name = _.__status.user;

    return _;
}
