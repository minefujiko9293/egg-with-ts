import { Controller } from 'egg';
import { MyError } from '../middleware/response';

export default class HomeController extends Controller {
  public async index() {
    return 'hello, egg with ts!';
  }

  public async test_route() {
    const { fun } = this.ctx.params;
    if (!fun) throw new Error('fun param missing!');
    if (!this[fun]) throw new MyError('notfound', 404);

    return this[fun]();
  }

  _gen_dept_frame(dept_list: string[]) {
    const dept_arr: any[] = [];

    const dept_tree_arr = this._convertToTree(dept_list);
    const dept_tree_obj = {};

    for (let _idx = 0; _idx < dept_list.length; _idx++) {
      // if (_idx >= 5) break; //lit for debug

      const _dept_from = dept_list[_idx];
      const _dept_items = _dept_from.split('/');

      let curr_branch = dept_tree_obj;
      _dept_items.forEach((__dept, __level) => {
        // console.warn(__dept);

        const dept_arr__item = {
          name: __dept,
          pre_name: _dept_items.slice(0, __level).join('/'),
          full_name: _dept_items.slice(0, __level + 1).join('/'),
        };
        if (!curr_branch[__dept]) {
          dept_arr.push(dept_arr__item);
          curr_branch[__dept] = {};
        }

        curr_branch = curr_branch[__dept];
      });
    }

    return { dept_arr, dept_tree_arr, dept_tree_obj };
  }

  _convertToTree(dept_list: string[]) {
    const result: any[] = [];

    dept_list.forEach((path) => {
      // 将路径按"/"分割成部门数组
      const departments = path.split('/');
      let currentNode = result;
      let fullPath = '';

      departments.forEach((department, index) => {
        // 构建完整路径
        fullPath += (index > 0 ? '/' : '') + department;

        // 检查当前部门节点是否已存在
        const existingNode = currentNode.find((node) => node.name === department);

        if (existingNode) {
          // 如果节点已存在，移动当前节点指针到该节点的子节点数组
          currentNode = existingNode.children;
        } else {
          // 如果节点不存在，创建新节点并添加到当前节点的子节点数组
          const newNode = {
            name: department,
            pre_name: index > 0 ? departments[index - 1] : '', // 上级部门名称
            full_name: fullPath, // 完整路径
            children: [],
          };
          currentNode.push(newNode);
          currentNode = newNode.children;
        }
      });
    });

    return result;
  }

  public test1() {
    const dept_list = [
      '部门A',
      '部门A/子部门a',
      '部门A/子部门a/领导',
      '部门A/子部门a/分局',
      '部门A/子部门a/分局/派出所p1',
      '部门A/子部门a/分局/派出所p1/警务队',
      '部门A/子部门a/分局/派出所p1/办理队',
      '部门A/子部门a/分局/派出所p1/指挥室',
      '部门A/子部门a/分局/派出所p2',
      '部门A/子部门a/分局/派出所p2/警务组',
      '部门A/子部门a/分局/派出所p2/办理组',
      '部门A/子部门a/分局/派出所p2/指挥岗',
    ];

    return this._gen_dept_frame(dept_list);
  }

  public async test2() {
    return this.service.index.index();
  }

  public async test3() {
    throw new MyError('test3 notfound', 404);
  }

  public async test4() {
    this.app.redis.set('test4', 10086);

    return this.app.redis.get('test4');
  }

  public async test5() {
    // const { queue_name, queue } = this.app.bullmq.async;
    // console.warn('🚀 ~ HomeController ~ test5 ~ queue_name:', queue_name);
    // const job = await queue.add(queue_name, { foo: 'bar' });
    // return job.id;
  }
}
