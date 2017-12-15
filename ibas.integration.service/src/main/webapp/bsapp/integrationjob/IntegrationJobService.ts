/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryIntegration } from "../../borep/BORepositories";
import { IntegrationJobRunnerApp } from "../integration/IntegrationJobRunnerApp";

/** 集成任务服务 */
export class IntegrationJobService extends ibas.ServiceApplication<IIntegrationJobServiceView, ibas.IBOServiceContract | ibas.IBOListServiceContract>  {

    /** 应用标识 */
    static APPLICATION_ID: string = "cc6ba9f8-bae5-4a44-ad1a-db406de60da5";
    /** 应用名称 */
    static APPLICATION_NAME: string = "integration_service_integrationjob";

    constructor() {
        super();
        this.id = IntegrationJobService.APPLICATION_ID;
        this.name = IntegrationJobService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        this.view.runJobEvent = this.runJob;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 运行服务 */
    runService(contract: ibas.IBOServiceContract | ibas.IBOListServiceContract): void {
        super.show();
    }
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria): void {
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryIntegration = new BORepositoryIntegration();
        boRepository.fetchIntegrationJob({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.IntegrationJob>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.view.showJobs(opRslt.resultObjects);
                    that.busy(false);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }
    protected runJob(job: bo.IntegrationJob): void {
        if (ibas.objects.isNull(job)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_run")
            ));
            return;
        }
        let app: IntegrationJobRunnerApp = new IntegrationJobRunnerApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.autoRun = true;
        app.run(job);
    }
}
/** 集成任务服务-视图 */
export interface IIntegrationJobServiceView extends ibas.IView {
    /** 显示任务 */
    showJobs(datas: bo.IntegrationJob[]): void;
    /** 运行任务 */
    runJobEvent: Function;
}
/** 集成任务服务映射 */
export class IntegrationJobServiceMapping extends ibas.ServiceMapping {

    constructor() {
        super();
        this.id = IntegrationJobService.APPLICATION_ID;
        this.name = IntegrationJobService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = ibas.BOListServiceProxy;
        this.icon = ibas.i18n.prop("integration_icon");
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new IntegrationJobService();
    }
}