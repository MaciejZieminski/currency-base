import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react';
import { convertPLNToUSD } from '../../utils/convertPLNToUSD';
import "@testing-library/jest-dom/extend-expect";
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />)
    });

    const testCases = [
        {from: "PLN", to: "USD", amount: 100},
        {from: "PLN", to: "USD", amount: 50},
        {from: "PLN", to: "USD", amount: 2000},
    ]

    for (const testObj of testCases) {
        it('should render proper info about conversion when PLN -> USD', () => {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${convertPLNToUSD(testObj.amount)}`);
        })
    };

    for (const testObj of testCases) {
        it('should render proper info about conversion when USD -> PLN', () => {
            render(<ResultBox from={testObj.to} to={testObj.from} amount={testObj.amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${convertUSDToPLN(testObj.amount)}`);
        })
    }; 

    it('should render the same value for the same currency; PLN case', () => {
        render(<ResultBox from='PLN' to='PLN' amount={100} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('PLN 100.00 = PLN 100.00');
    });
    
    it('should render the same value for the same currency; USD case', () => {
        render(<ResultBox from='USD' to='USD' amount={100} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('$100.00 = $100.00');
    });

    it('should return error message if the input is negative', () => {
        render(<ResultBox from='USD' to='PLN' amount={-100} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('-$100.00 = PLN 0.00');
    })

});