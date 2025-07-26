/**
 * Currency Selector Component
 * 
 * Allows users to select their preferred currency for price display.
 * Integrates with the currency service and updates all prices dynamically.
 */

'use client';

// ...existing code...
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency } from '@/lib/currency';

interface CurrencySelectorProps {
  className?: string;
}

export function CurrencySelector({ className }: CurrencySelectorProps) {
  const { currentCurrency, changeCurrency, supportedCurrencies } = useCurrency();

  return (
    <Select value={currentCurrency} onValueChange={changeCurrency}>
      <SelectTrigger className={className}>
        <SelectValue>
          {supportedCurrencies.find(c => c.code === currentCurrency)?.symbol} {currentCurrency}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {supportedCurrencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <div className="flex items-center gap-2">
              <span className="font-medium">{currency.symbol}</span>
              <span>{currency.code}</span>
              <span className="text-sm text-muted-foreground">- {currency.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/**
 * Price Display Component with Currency Conversion
 */
interface PriceDisplayProps {
  amount: number;
  originalCurrency?: string;
  className?: string;
  showOriginal?: boolean;
}

export function PriceDisplay({ 
  amount, 
  originalCurrency = 'USD', 
  className,
  showOriginal = false 
}: PriceDisplayProps) {
  const { currentCurrency, formatPrice, convertPrice } = useCurrency();
  const displayAmount = convertPrice(amount, originalCurrency);
  const formattedPrice = formatPrice(displayAmount);

  return (
    <span className={className}>
      {formattedPrice}
      {showOriginal && originalCurrency !== currentCurrency && (
        <span className="text-xs text-muted-foreground ml-1">
          (≈ {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: originalCurrency,
          }).format(amount)})
        </span>
      )}
    </span>
  );
}

/**
 * Compact Currency Toggle for Header
 */
export function CurrencyToggle() {
  const { currentCurrency, changeCurrency, supportedCurrencies } = useCurrency();
  
  const handleClick = () => {
    const currentIndex = supportedCurrencies.findIndex(c => c.code === currentCurrency);
    const nextIndex = (currentIndex + 1) % supportedCurrencies.length;
    changeCurrency(supportedCurrencies[nextIndex].code);
  };

  const currentCurrencyInfo = supportedCurrencies.find(c => c.code === currentCurrency);

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 px-2 py-1 text-sm rounded-md hover:bg-muted transition-colors"
      title={`Switch currency (${currentCurrencyInfo?.name})`}
    >
      <span className="font-medium">{currentCurrencyInfo?.symbol}</span>
      <span className="text-xs">{currentCurrency}</span>
    </button>
  );
}
