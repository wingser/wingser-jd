# -*- coding: utf-8 -*-
"""
:author @limoruirui
cron: 18 0-23/6 * * *
new Env('爱企查e卡监控');
"""

from random import choice

import requests,json

from notify_mtr import send
from utils import get_data


class EcardCheck:
    @staticmethod
    def get_ua(brower_name):
        url = "https://ghproxy.com/https://raw.githubusercontent.com/Oreomeow/checkinpanel/master/user-agent.json"
        useragent = choice(requests.get(url).json()[brower_name])
        return useragent

    @staticmethod
    def randomstr(numb):
        s = ""
        for _ in range(numb):
            s = s + choice("abcdefghijklmnopqrstuvwxyz0123456789")
        return s

    def main(self):
        url = "https://aiqicha.baidu.com/usercenter/getBenefitStatusAjax"
        headers = {
            "User-Agent": self.get_ua("Safari"),
            "Referer": f"https://aiqicha.baidu.com/m/usercenter/exchangeList?VNK={self.randomstr(8)}",
        }
        r = requests.get(url, headers=headers)
        print("请求成功！json：" + str(r.json()))
        if r.json()["data"]["AQ03006"] == 1:
            send("爱企查", "爱奇艺月卡，请进行兑换")
        if r.json()["data"]["AQ03007"] == 1:
            send("爱企查", "爱奇艺季卡，请进行兑换")
        if r.json()["data"]["AQ03008"] == 1:
            send("爱企查", "爱企查京东e卡有货，请进行兑换")
        if r.json()["data"]["AQ03009"] == 1:
            send("爱企查", "网盘会员月卡，请进行兑换")
        if r.json()["data"]["AQ03010"] == 1:
            send("爱企查", "网盘超级会员月卡，请进行兑换")

if __name__ == "__main__":
    data = get_data()
    ecardcheck = data.get("ECARDCHECK")
    if ecardcheck:
        EcardCheck().main()

'''
        if requests.get(url, headers=headers).json()["data"]["AQ03006"] == 1:
            send("爱企查", "爱奇艺月卡，请进行兑换")
        if requests.get(url, headers=headers).json()["data"]["AQ03007"] == 1:
            send("爱企查", "爱奇艺季卡，请进行兑换")
        if requests.get(url, headers=headers).json()["data"]["AQ03008"] == 1:
            send("爱企查", "爱企查京东e卡有货，请进行兑换")
        if requests.get(url, headers=headers).json()["data"]["AQ03009"] == 1:
            send("爱企查", "网盘会员月卡，请进行兑换")
        if requests.get(url, headers=headers).json()["data"]["AQ03010"] == 1:
            send("爱企查", "网盘超级会员月卡，请进行兑换")
'''