import ampluna from "/tokens/ampluna.svg";
import atom from "/tokens/atom.svg";
import axlusdc from "../assets/icons/axlusdc.svg";
import blur from "../assets/icons/blur.svg";
import bneo from "../assets/icons/bneo.svg";
import busd from "../assets/icons/busd.svg";
import eth from "../assets/icons/eth.svg";
import evmos from "../assets/icons/evmos.svg";
import gmx from "../assets/icons/gmx.svg";
import ibcx from "../assets/icons/ibcx.svg";
import iris from "../assets/icons/iris.svg";
import kuji from "../assets/icons/kuji.svg";
import lsi from "../assets/icons/lsi.svg";
import luna from "../assets/icons/luna.svg";
import okb from "../assets/icons/okb.svg";
import okt from "../assets/icons/okt.svg";
import ratom from "../assets/icons/ratom.svg";
import rswth from "../assets/icons/rswth.svg";
import statom from "../assets/icons/statom.svg";
import stevmos from "../assets/icons/stevmos.svg";
import stluna from "../assets/icons/stluna.svg";
import stosmo from "../assets/icons/stosmo.svg";
import strd from "../assets/icons/strd.svg";
import swth from "../assets/icons/swth.svg";
import usc from "../assets/icons/usc.svg";
import usd from "../assets/icons/usd.svg";
import usdc from "../assets/icons/usdc.svg";
import wbtc from "../assets/icons/wbtc.svg";
import wsteth from "../assets/icons/wsteth.svg";
import yieldusd from "../assets/icons/yieldusd.svg";
import zil from "../assets/icons/zil.svg";

const icons: Record<string, string> = {
    ampluna: ampluna,
    atom: atom,
    axlusdc: axlusdc,
    blur: blur,
    bneo: bneo,
    busd: busd,
    eth: eth,
    evmos: evmos,
    gmx: gmx,
    ibcx: ibcx,
    iris: iris,
    kuji: kuji,
    lsi: lsi,
    luna: luna,
    okb: okb,
    okt: okt,
    ratom: ratom,
    rswth: rswth,
    statom: statom,
    stevmos: stevmos,
    stluna: stluna,
    stosmo: stosmo,
    strd: strd,
    swth: swth,
    usc: usc,
    usd: usd,
    usdc: usdc,
    wbtc: wbtc,
    wsteth: wsteth,
    yieldusd: yieldusd,
    zil: zil,
};

export const TokenIcon = ({ token }: { token: string }) => {
    const icon = icons[token];

    if (!icon) {
        return <div>icon not found</div>;
    }

    return <img src={icon} alt={`${token} icon`} className="h-6 w-6" />;
};

