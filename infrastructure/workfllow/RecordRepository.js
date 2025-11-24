export class RecordRepository {

    async getProcessStatus(appId) {
        return await kintone.api(
            kintone.api.url('/k/v1/app/status.json', true),
            'GET',
            { app: appId }
        );
    }

    async getUserList() {
        const resp = await kintone.api(
            kintone.api.url('/v1/users.json', true),
            "GET",
            {}
        );

        return resp.users.map(user => ({
            code: user.code,
            name: user.name
        }));
    }

    async updateRecordStatusMany(payload) {
        return await kintone.api(
            kintone.api.url('/k/v1/records/status.json', true),
            "PUT",
            payload
        );
    }

    async getRecordsByIds(appId, ids) {
        const query = `"$id" in (${ids.join(",")})`;
        return await kintone.api("/k/v1/records", "GET", {
            app: appId,
            query
        });
    }

}
