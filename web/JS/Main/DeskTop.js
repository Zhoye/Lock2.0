﻿var now_date = new Date();

Ext.onReady(function () {
    Ext.define('MainView', {
        extend: 'Ext.container.Viewport',

        layout: {
            type: 'fit'
        },

        initComponent: function () {
            var me = this;

            Ext.applyIf(me, {
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'fit'
                        },
                        id: 't_show',
                        height:document.documentElement.clientHeight,
                        html:""
                    }
                ]
            });
            me.callParent(arguments);
        }
    });
    new MainView();

    dataBind();
});

function dataBind()
{
    CS("CZCLZ.DeskTop.Tshow", function (retVal) {
        if (retVal)
        {
            Ext.getCmp("t_show").update(retVal);
            addListen();
        }
    }, CS.onError, now_date)
}

function selecttime() {
    var win = new TimeWin();
    win.show(null, function () {
        Ext.getCmp("CheckTime").setValue(now_date);
    });
}

function addListen() {
    var ydata = Ext.query("#yd-data td");
    for (var i = 0; i < ydata.length; i++) {
        Ext.EventManager.addListener(ydata[i], "click", function () {
            console.log($(this).children("input")[0].value);
            console.log($(this).children("input")[1].value);
        });
    }
}

//弹出框
Ext.define('TimeWin', {
    extend: 'Ext.window.Window',

    height: 244,
    width: 285,
    layout: {
        type: 'fit'
    },
    title: '选择时间',
    modal: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    items: [
                        {
                            xtype: 'datefield',
                            id:"CheckTime",
                            format: 'Y-m-d',
                            editable: false,
                            padding: 10,
                            labelWidth:40,
                            fieldLabel: '时间'
                        }
                    ],
                    buttonAlign: 'center',
                    buttons: [
                        {
                            text: '确定',
                            handler: function () {
                                now_date = Ext.getCmp("CheckTime").getValue();
                                dataBind();
                                me.close();
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});

