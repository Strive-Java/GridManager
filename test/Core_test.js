/**
 * Created by baukh on 17/4/19.
 */
'use strict';
import { jTool } from '../src/js/Base';
import Core from '../src/js/Core';
import testData from '../src/data/testData';
/**
 * 对象完整性验证
 */
describe('Core 对象完整性验证', function() {
	it('对象完整性验证 Core.__refreshGrid', function () {
		expect(Core.__refreshGrid).toBeDefined();
		expect(Core.__refreshGrid.length).toBe(2);
	});

	it('对象完整性验证 Core.removeRefreshingClass', function () {
		expect(Core.removeRefreshingClass).toBeDefined();
		expect(Core.removeRefreshingClass.length).toBe(1);
	});

	it('对象完整性验证 Core.driveDomForSuccessAfter', function () {
		expect(Core.driveDomForSuccessAfter).toBeDefined();
		expect(Core.driveDomForSuccessAfter.length).toBe(4);
	});

	it('对象完整性验证 Core.createDOM', function () {
		expect(Core.createDOM).toBeDefined();
		expect(Core.createDOM.length).toBe(1);
	});

	it('对象完整性验证 Core.resetTd', function () {
		expect(Core.resetTd).toBeDefined();
		expect(Core.resetTd.length).toBe(2);
	});
});
/**
 * 验证原型方法总数
 */
describe('Core 验证原型方法总数', function() {
	var getPropertyCount = null;
	beforeEach(function() {
		getPropertyCount = function(o){
			var n, count = 0;
			for(n in o){
				if(o.hasOwnProperty(n)){
					count++;
				}
			}
			return count;
		}
	});
	afterEach(function(){
		getPropertyCount = null;
	});
	it('Function count', function() {
		// es6 中 constructor 也会算做为对象的属性, 所以总量上会增加1
		expect(getPropertyCount(Object.getOwnPropertyNames(Object.getPrototypeOf(Core)))).toBe(5 + 1);
	});
});
describe('Core', function() {
	let table = null;
	let $table = null;
	let gmName = 'test-core';
	beforeAll(function(){
		table = document.createElement('table');
		table.setAttribute('grid-manager', gmName);
		document.querySelector('body').appendChild(table);
		$table = jTool('table[grid-manager="'+ gmName +'"]');
		document.querySelector('table[grid-manager="'+ gmName +'"]').GM({
			ajax_data: testData
			,columnData: [
				{
					key: 'name',
					width: '100px',
					text: '名称'
				},{
					key: 'info',
					text: '使用说明'
				},{
					key: 'url',
					text: 'url'
				},{
					key: 'createDate',
					text: '创建时间'
				},{
					key: 'lastDate',
					text: '最后修改时间'
				},{
					key: 'action',
					text: '操作',
					template: function(action, rowObject){
						return '<span class="plugin-action edit-action" learnLink-id="'+rowObject.id+'">编辑</span>'
							+'<span class="plugin-action del-action" learnLink-id="'+rowObject.id+'">删除</span>';
					}
				}
			]
		});
	});
	afterAll(function () {
		table = null;
		$table = null;
		gmName = null;
		document.body.innerHTML = '';
	});

	// 刷新成功后, 回调函数执行
	it('Core.__refreshGrid($table, callback)', function(){
		let callback = jasmine.createSpy('callback');
		Core.__refreshGrid($table, callback);
		expect(callback).toHaveBeenCalled();

		callback = null;
	});

	it('Core.removeRefreshingClass($tableWrap)', function(){
	});

	it('Core.driveDomForSuccessAfter($table, settings, response, callback)', function(){
	});


	// TODO 暂时没想到怎么测这个方法
	it('Core.createDOM($table)', function(){

	});

	it('Core.resetTd(dom, isSingleRow)', function(){
		Core.resetTd($table, false);
		Core.resetTd($table.find('tbody tr:first-child'), true);
	});
});
