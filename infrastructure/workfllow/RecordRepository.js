export class RecordRepository {

    async getProcessStatus() {
        return await kintone.api(
            kintone.api.url('/k/v1/app/status.json', true),
            'GET',
            { app: kintone.app.getId() }
        );
    }

    async getUserList() {
        const resp = await kintone.api(
            kintone.api.url('/v1/users.json', true),
            "GET",
            {}
        );

        return resp.users.map(u => ({
            code: u.code,
            name: u.name
        }));
    }

    async updateRecordStatusMany(recordIds, actionName, assignee) {
        const payload = {
            app: kintone.app.getId(),
            records: recordIds.map(id => ({
                id,
                action: actionName,
                assignee
            }))
        };

        return await kintone.api(
            kintone.api.url('/k/v1/records/status.json', true),
            "PUT",
            payload
        );
    }
}
