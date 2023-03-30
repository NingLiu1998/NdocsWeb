
import { ElNotification, ElMessage } from "element-plus"

export class u {

    //手机号校验
    static isPhoneNumber(phoneNumber: string): boolean {
        return /^1[3456789]\d{9}$/.test(phoneNumber);
    }

    // 获取当前时间戳
    static getCurrentTimestamp(): number {
        return Math.floor(Date.now() / 1000);
    }

    // 生成随机字符串
    static generateRandomString(length: number = 32): string {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    static NoticeOk(message: any, title: string = '成功'): void {
        this.Notice(title, message, 'success');
    }

    static NoticeNo(message: string, title: string = '失败'): void {
        this.Notice(title, message, 'error');
    }

    static Notice(title: string = '通知', message: any, type: string = 'info'): void {
        ElNotification({
            title: title,
            message: message,
            type: type
        })
    }


    static Message(message: any, type: string): void {
        ElMessage({
            message: message,
            type: type
        });
    }

    static MessageNo(message: string): void {
        ElMessage({
            message: message,
            type: 'danger'
        });
    }

    static MessageWarning(message: string): void {
        ElMessage({
            message: message,
            type: 'warning'
        });
    }

    static MessageOk(message: string): void {
        ElMessage({
            message: message,
            type: 'success'
        });
    }
}