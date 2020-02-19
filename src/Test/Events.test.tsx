import React from "react";
import { shallow, render } from "enzyme";
import Events from "../Components/Events";
import data from '../DB/test-assignment.json';

describe("<Events />", () => {
    it("shallow", () => {
        const wrapper = shallow(<Events currentSport='FOOTBALL' data={data} />);
        expect(wrapper).toMatchSnapshot();
    });

});
