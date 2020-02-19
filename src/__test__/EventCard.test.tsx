import React from "react";
import { shallow, render } from "enzyme";
import EventCard from "../components/EventCard";

describe("<Events />", () => {
    it("shallow", () => {
        const value = {
            awayName: "PAOK Thessaloniki",
            createdAt: "2015-12-18T12:30:39.234Z",
            group: "Greek Cup",
            homeName: "Olympiakos Volos",
            id: 1002916451,
            name: "Olympiakos Volos - PAOK Thessaloniki",
            objectId: "UPJ240T2Qj",
            sport: "FOOTBALL",
            country: "FRANCE",
            state: "STARTED",
            handleClick: () => { }
        }
        const wrapper = shallow(<EventCard {...value} />);
        expect(wrapper).toMatchSnapshot();
    });

});