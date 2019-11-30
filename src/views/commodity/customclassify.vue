<template>
    <section class="classify" style="padding:20px">
        <div class="infoItem">商品分类</div>
        <el-button style="margin-bottom:20px" @click="addNode">新增分类</el-button>
        <vue-tree-list
            @click="onClick"
            @change-name="onChangeName"
            @delete-node="onDel"
            @add-node="onAddNode"
            :model="data"
            default-tree-node-name="请编辑分类"
            default-leaf-node-name="请编辑商品"
            v-bind:default-expanded="false"
        >
            <span class="icon" slot="addTreeNode"></span>
            <el-button size="mini" class slot="addLeafNode">新增商品</el-button>
            <el-button size="mini" class slot="editNode">编辑</el-button>
            <el-button size="mini" class slot="delNode">删除</el-button>
        </vue-tree-list>
        <!-- <button @click="getNewTree">Get new tree</button>
    <pre>
      {{newTree}}
        </pre>-->
    </section>
</template>
 
<script>
import { VueTreeList, Tree, TreeNode } from "vue-tree-list";
export default {
    components: {
        VueTreeList
    },
    data() {
        return {
            newTree: {},
            data: new Tree([
                {
                    name: "特产",
                    id: 1,
                    pid: 0,
                    dragDisabled: true,
                    addTreeNodeDisabled: true,
                    addLeafNodeDisabled: true,
                    editNodeDisabled: true,
                    delNodeDisabled: true,
                    children: [
                        {
                            name: "土豆",
                            id: 2,
                            isLeaf: true,
                            pid: 1
                        }
                    ]
                },
                {
                    name: "水果",
                    id: 3,
                    pid: 0,
                    disabled: true
                },
                {
                    name: "蔬菜",
                    id: 4,
                    pid: 0
                }
            ])
        };
    },
    methods: {
        onDel(node) {
            console.log(node);
            node.remove();
        },

        onChangeName(params) {
            console.log(params);
        },

        onAddNode(params) {
            console.log(params);
        },

        onClick(params) {
            console.log(params);
        },

        addNode() {
            var node = new TreeNode({ name: "请编辑分类", isLeaf: false });
            if (!this.data.children) this.data.children = [];
            this.data.addChildren(node);
        },

        getNewTree() {
            var vm = this;
            function _dfs(oldNode) {
                var newNode = {};

                for (var k in oldNode) {
                    if (k !== "children" && k !== "parent") {
                        newNode[k] = oldNode[k];
                    }
                }

                if (oldNode.children && oldNode.children.length > 0) {
                    newNode.children = [];
                    for (
                        var i = 0, len = oldNode.children.length;
                        i < len;
                        i++
                    ) {
                        newNode.children.push(_dfs(oldNode.children[i]));
                    }
                }
                return newNode;
            }

            vm.newTree = _dfs(vm.data);
        }
    }
};
</script> 

<style lang="scss" scopoed>
.classify {
    .infoItem {
        width: 99%;
        padding: 10px;
        background: #f2f2f2;
        margin-bottom: 20px;
    }
    .vtl {
        .vtl-tree-node {
            padding: 19px 0 5px 1rem;
            font-size: 18px;
            // border: 1px solid #ff22ff;
            // border:1px solid #ff55ff
        }
        .vtl-menu-icon ::before{
            content: ""
        }
        // .vtl-icon-folder:before{
        //     content: ""
        // }
        .vtl-drag-disabled {
            background-color: #f2f2f2;
            &:hover {
                background-color: #f2f2f2;
            }
        }
        .vtl-disabled {
            background-color: #fff;
        }
    }
    .icon {
        &:hover {
            cursor: pointer;
        }
    }
}
</style> 
 